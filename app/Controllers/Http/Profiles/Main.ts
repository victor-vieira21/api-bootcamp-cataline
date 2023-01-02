/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProfilesController {
  public async show({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    const user = await User.query().where({ username })
    .preload('avatar')
    .withCount('posts')
    .withCount('followers')
    .withCount('following')
    .firstOrFail()

    if(user.id !== auth.user!.id){
        //CRUD DIRETO NA TABELA
      const isFollowing = await Database.query()
      .from('follows')
      .where('follower_id', auth.user!.id)
      .first()

      user.$extras.isFollowing = isFollowing ? true : false
    }


    // TESTE QUERY
    // via Database da pra puxar do bd 
    //
    // const teste = await Database.query()
    // .from('reactions')
    // .where('user_id', auth.user!.id)

    // if(teste){
    //     user.$extras.teste = teste
    // }
    

    return user.serialize({
      fields: {
        omit: ['email', 'createdAt', 'updatedAt', 'rememberMeToken'],
      },
    })
  }
}
