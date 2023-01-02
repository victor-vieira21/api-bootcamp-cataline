import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/Follows'

export default class FollowController {
  public async store({ request, auth }: HttpContextContract) {
    const { followingId } = await request.validate(StoreValidator)

    const user = await User.findOrFail(followingId)

    await user.related('followers').attach([auth.user!.id])
  }
}
