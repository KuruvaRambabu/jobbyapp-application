class ProfileDetailsModel {
  name

  profileImageUrl

  shortBio

  constructor(profileDetails) {
    this.name = profileDetails.name
    this.profileImageUrl = profileDetails.profile_image_url
    this.shortBio = profileDetails.short_bio
  }
}

export default ProfileDetailsModel
