import { ReactionTypes } from 'App/Utils'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: ReactionTypes

  @column()
  public userId: number

  @column()
  public postId: number
}
