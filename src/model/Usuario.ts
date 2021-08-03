export default class Usuario {
  username: string;

  name: string;

  lastName: string | null;

  profileImageUrl: string | null;

  bio: string | null;

  email: string | null;

  gender: string | null;

  constructor(
    username: string,
    name: string,
    lastName: string | null,
    profileImageUrl: string | null,
    bio: string | null,
    email: string | null,
    gender: string | null
  ) {
    this.username = username;
    this.name = name;
    this.lastName = lastName;
    this.profileImageUrl = profileImageUrl;
    this.bio = bio;
    this.email = email;
    this.gender = gender;
  }
}
