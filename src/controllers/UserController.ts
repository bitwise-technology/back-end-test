import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import apiGithub from '../services/apiGithub';

export class UserController {
    async create(req: Request, res: Response) {
        const { username, name, lastname, image, bio, email, gender } = req.body;

        try {
            const usernameExists = await userRepository.findOneBy({ username });

            if (usernameExists) {
                return res.status(400).json({ message: "There is already a registered user with this USERNAME." });
            }

            const emailExists = await userRepository.findOneBy({ email });

            if (emailExists) {
                return res.status(400).json({ message: "There is already a registered user with this E-MAIL." });
            }

            if (gender !== "Male" && gender !== "male" && gender !== "Female" && gender !== "female" && gender !== undefined) {
                return res.status(400).json({ message: "There is no such genre." });
            }

            const newUser = userRepository.create({
                username,
                name,
                last_name: lastname,
                profile_image_url: image,
                bio,
                email,
                gender: gender === undefined ? "Not Specified" : gender
            });


            const userData = await userRepository.save(newUser);


            return res.status(201).json(userData);

        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }


    }

    async createUserGithub(req: Request, res: Response) {
        const { username } = req.body;

        try {
            const usernameExists = await userRepository.findOneBy({ username });

            if (usernameExists) {
                return res.status(400).json({ message: "There is already a registered user with this USERNAME." });
            }

            const responseGithub = await apiGithub.get(`/users/${username}`);

            const { data } = responseGithub;

            const newUser = userRepository.create({
                username,
                name: data.name ? data.name : `Atualize seu NOME: ${username}`,
                profile_image_url: data.avatar_url,
                bio: data.bio,
                email: data.email ? data.email : `${username}@atualizeseuemail.com`,
                gender: "Not Specified"
            });

            const userData = await userRepository.save(newUser);

            return res.status(201).json(userData);

        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }


    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { username, name, lastname, image, bio, email, gender } = req.body;

        try {
            const userExists = await userRepository.findOneBy({ id: Number(id) });

            if (!userExists) {
                return res.status(404).json({ message: "User not found." });
            }

            const usernameExists = await userRepository.findOneBy({ username });

            if (usernameExists && username !== userExists.username) {
                return res.status(404).json({ message: "Another user with that USERNAME already exists." });
            }

            const emailExists = await userRepository.findOneBy({ email });

            if (emailExists && email !== userExists.email) {
                return res.status(404).json({ message: "There is already another user with that E-MAIL." });
            }

            if (gender !== "Male" && gender !== "male" && gender !== "Female" && gender !== "female" && gender !== undefined) {
                return res.status(400).json({ message: "There is no such genre." });
            }

            const updatedUser = {
                id: id ? Number(id) : userExists.id,
                username: username ? username : userExists.username,
                name,
                last_name: lastname,
                profile_image_url: image,
                bio,
                email: email ? email : userExists.email,
                gender: gender === undefined ? "Not Specified" : gender
            }

            await userRepository.save(updatedUser);

            return res.status(200).json({ message: "User updated successfully!" });

        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }


    }

    async readUsername(req: Request, res: Response) {
        const { username } = req.params;

        try {
            const usernameExists = await userRepository.findOneBy({ username });

            if (!usernameExists) {
                return res.status(400).json({ message: "There is no user registered with this USERNAME." });
            }

            const responseGithub = await apiGithub.get(`/users/${usernameExists.username}`);

            const { data } = responseGithub;

            const userData = {
                id: data.id,
                username: data.login,
                name: data.name,
                image: data.avatar_url,
                bio: data.bio,
                email: data.email,
                followers: data.followers,
                following: data.following,
                public_repos: data.public_repos,
                public_url_user: data.html_url
            }

            return res.status(200).json(userData);

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Request failed with status code 404") {
                    const usernameExists = await userRepository.findOneBy({ username });

                    return res.status(200).json(usernameExists);
                }
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async readEmail(req: Request, res: Response) {
        const { email } = req.params;

        try {
            const emailExists = await userRepository.findOneBy({ email });

            if (!emailExists) {
                return res.status(400).json({ message: "There is no user registered with this E-MAIL." });
            }

            const responseGithub = await apiGithub.get(`/users/${emailExists.username}`);

            const { data } = responseGithub;

            const userData = {
                id: data.id,
                username: data.login,
                name: data.name,
                image: data.avatar_url,
                bio: data.bio,
                email: data.email,
                followers: data.followers,
                following: data.following,
                public_repos: data.public_repos,
                public_url_user: data.html_url
            }

            return res.status(200).json(userData);

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Request failed with status code 404") {
                    const emailExists = await userRepository.findOneBy({ email });

                    return res.status(200).json(emailExists);
                }
            }

            return res.status(500).json({ message: "Internal server error." });
        }
    }
}