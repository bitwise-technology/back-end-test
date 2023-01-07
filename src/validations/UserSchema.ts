import { z } from 'zod';

export const userSchema = z.object({
    username: z.string({
        required_error: "Missing required field: USERNAME.",
        invalid_type_error: "USERNAME invalid."
    })
        .min(5, "USERNAME must be at least 5 characters long.")
        .max(30, "USERNAME can only be a maximum of 30 characters.")
        .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/, "USERNAME must contain letters and numbers."),
    name: z.string({
        required_error: "Missing required field: NAME.",
        invalid_type_error: "NAME invalid."
    })
        .min(3, "NAME must be at least 3 characters long.")
        .max(30, "NAME can only be a maximum of 30 characters.")
        .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "NAME does not accept numbers."),
    lastname: z.string({
        invalid_type_error: "LASTNAME invalid."
    })
        .min(3, "LASTNAME must be at least 3 characters long.")
        .max(30, "LASTNAME can only be a maximum of 30 characters.")
        .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "LASTNAME does not accept numbers.")
        .optional(),
    image: z.string({
        invalid_type_error: "IMAGE invalid."
    })
        .optional(),
    bio: z.string({
        invalid_type_error: "BIO invalid."
    })
        .min(3, "BIO must be at least 3 characters long.")
        .max(30, "BIO can only be a maximum of 30 characters.")
        .optional(),
    email: z.string({
        required_error: "Missing required field: E-MAIL.",
        invalid_type_error: "E-MAIL invalid."
    })
        .email({ message: "E-MAIL with invalid format." }),
    gender: z.string({
        invalid_type_error: "GENDER invalid."
    })
        .optional()
});
