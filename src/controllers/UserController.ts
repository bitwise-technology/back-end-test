import { Request, Response } from 'express';
import { BadRequestError } from '../helpers/api-errors';
import { userRepository } from '../repositories/userRepository';

export class UserController {
    async create(req: Request, res: Response) {
        const { username, name, lastname, image, bio, email, gender } = req.body;

        const usernameExists = await userRepository.findOneBy({ username });

        if (usernameExists) {
            throw new BadRequestError("There is already a registered user with this USERNAME.");
        }

        const emailExists = await userRepository.findOneBy({ email });

        if (emailExists) {
            throw new BadRequestError("There is already a registered user with this E-MAIL.");
        }

        if (gender !== "Male" && gender !== "male" && gender !== "Female" && gender !== "female" && gender !== undefined) {
            console.log(gender)
            throw new BadRequestError("There is no such genre.")
        }

        if (gender === undefined) {
            const newUser = userRepository.create({
                username,
                name,
                last_name: lastname,
                profile_image_url: image,
                bio,
                email,
                gender: "Not Specified"
            });


            const userData = await userRepository.save(newUser);


            return res.status(201).json(userData);

        } else {
            const newUser = userRepository.create({
                username,
                name,
                last_name: lastname,
                profile_image_url: image,
                bio,
                email,
                gender
            });


            const userData = await userRepository.save(newUser);


            return res.status(201).json(userData);
        }



    }
}