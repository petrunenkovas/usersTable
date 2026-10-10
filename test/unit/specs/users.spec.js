const assert = require('assert')
const { loadUsers, sortUsers, groupUsers, validName } = require('../../../src/utils/users')

const users = [
  { id: 1, name: 'Zoe', phone: '8', chiefId: null },
  { id: 2, name: 'Anna', phone: '7', chiefId: 1 }
]

assert.deepStrictEqual(sortUsers(users, 'name', 1).map(user => user.name), ['Anna', 'Zoe'])
assert.deepStrictEqual(sortUsers(users, 'name', -1).map(user => user.name), ['Zoe', 'Anna'])
assert.deepStrictEqual(sortUsers(users, 'phone', 1).map(user => user.phone), ['7', '8'])
const rootOnly = groupUsers(users.slice(0, 1))
const withChild = groupUsers(users)
assert.strictEqual(rootOnly[0].subordinates.length, 0)
assert.strictEqual(withChild[0].subordinates[0].name, 'Anna')
assert.strictEqual(users[0].subordinates, undefined)
assert.notStrictEqual(rootOnly[0], withChild[0])
assert.deepStrictEqual(loadUsers('{bad json'), [])
assert.deepStrictEqual(loadUsers('{}'), [])
assert.strictEqual(loadUsers('[{"id":1,"chiefId":"null"}]')[0].chiefId, null)
assert.strictEqual(validName('   '), false)
assert.strictEqual(validName('Anna'), true)

console.log('users.spec.js passed')
