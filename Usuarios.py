class Usuario:
    def __init__(self, username, name, lastName, profileImageUrl, bio, email,gender):
        self.username = username
        self.name = name
        self.lastName = lastName
        self.profileImageUrl = profileImageUrl
        self.bio = bio
        self.email = email
        self.gender = gender

    def get_username(self):
        return  self.username

    def set_username(self,username):
        self.username = username

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_lastname(self):
        return self.lastName

    def set_lastname(self, lastname):
        self.lastName = lastname

    def get_profileImageUrl(self):
        return self.profileImageUrl

    def set_profileImageUrl(self, profileImageUrl):
        self.profileImageUrl = profileImageUrl

    def get_bio(self):
        return self.bio

    def set_bio(self, bio):
        self.bio = bio

    def get_email(self):
        return self.email

    def set_email(self, email):
        self.email = email

    def get_gender(self):
        return self.gender

    def set_gender(self, gender):
        self.gender = gender

