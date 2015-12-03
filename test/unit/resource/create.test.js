/* global Resource:true */
import {assert} from 'chai'

export function init () {
  describe('#create', function () {
    it('should be an instance function', function () {
      assert.isFunction(Resource.prototype.create)
      let User = Resource.extend({}, {
        idAttribute: '_id',
        name: 'user'
      })
      class User2 extends Resource {}
      class User3 extends User2 {}
      assert.isFunction(User.prototype.create)
      assert.isFunction(User2.prototype.create)
      assert.isTrue(Resource.prototype.create === User.prototype.create)
      assert.isTrue(Resource.prototype.create === User2.prototype.create)
      assert.isTrue(User.prototype.create === User2.prototype.create)
      assert.isTrue(User2.prototype.create === User3.prototype.create)
    })
    it('should create', async function () {
      const props = { name: 'John' }
      const opts = {}
      let createCalled = false
      class User extends Resource {}
      User.schema({ id: {} })
      User.configure({
        autoInject: false
      })
      let user = new User(props)
      User.create = function (_props, _opts) {
        createCalled = true
        return new Promise(function (resolve, reject) {
          assert.deepEqual(_props, { name: 'John' }, 'should pass in the props')
          _props[User.idAttribute] = new Date().getTime()
          assert.isTrue(_props instanceof User, 'props is a User')
          assert.isTrue(_opts === opts, 'should pass in the opts')
          resolve({ id: _props.id, name: _props.name })
        })
      }

      const _user = await user.create(opts)
      assert.isTrue(createCalled, 'Adapter#create should have been called')
      assert.isTrue(_user !== user, 'same user is returned')
      assert.isDefined(_user[User.idAttribute], 'created user has an id')
      assert.isFalse(_user instanceof User, 'user is not a User')
    })
  })
}
