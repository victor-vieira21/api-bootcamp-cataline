import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post'
import { User, Post } from 'App/Models'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class PostsController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    //Busca um user pelo seu username:
    const user =
      (await User.findBy('username', username)) || auth.user! /* <- Caso o user autenticado tenha 
   digitado o username errado */

    //Carrega do post os dados:
    await user.load('posts', (query) => {
      //Carrega primeiro os posts mais recentes (id < pro >):
      query.orderBy('id', 'desc')
      query.preload('media')

      query.withCount('comments')

      //Carrega a dB do user os dados:
      query.preload('user', (query) => {
        query.select(['id', 'name', 'username'])
        query.preload('avatar')
      })

      //Carrega dos comentários os dados:
      query.preload('comments', (query) => {
        query.select(['userId', 'id', 'content', 'createdAt'])
        query.preload('user', (query) => {
          query.select(['id', 'name', 'username'])
          query.preload('avatar')
        })
      })

      //carregar counts de like's
      query.withCount('reactions', (query) => {
        query.where('type', 'like')
        query.as('likeCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'love')
        query.as('loveCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'haha')
        query.as('hahaCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'sad')
        query.as('sadCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'angry')
        query.as('angryCount')
      })

      query.preload('reactions', () => {
        query.where('userId', auth.user!.id).first()
      })
    })

    //+ Retorna as postagens as quais pertencem a esse usuário:
    return user.posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('posts').create(data)

    return post
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.merge(data).save()

    return post
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.load('media')

    if (post.media) {
      fs.unlinkSync(Application.tmpPath('uploads', post.media.fileName))

      await post.media.delete()
    }

    await post.delete()
  }
}
