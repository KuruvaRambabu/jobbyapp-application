class SkillsDataModel {
  imageUrl

  name

  constructor(skill) {
    this.name = skill.name
    this.imageUrl = skill.image_url
  }
}

export default SkillsDataModel
