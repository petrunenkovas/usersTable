export function loadUsers (storedUsers) {
  try {
    const users = JSON.parse(storedUsers)
    if (!Array.isArray(users)) return []
    return users.map(user => Object.assign({}, user, {
      chiefId: user.chiefId === 'null' ? null : user.chiefId
    }))
  } catch (error) {
    return []
  }
}

export function sortUsers (users, field, ascending) {
  if (!field) return [...users]
  return [...users].sort((first, second) => {
    if (first[field] > second[field]) return ascending
    if (first[field] < second[field]) return -ascending
    return 0
  })
}

export function groupUsers (users) {
  const rows = users.map(user => Object.assign({}, user, { subordinates: [] }))
  const byId = new Map(rows.map(row => [row.id, row]))
  const roots = []

  rows.forEach(row => {
    if (row.chiefId == null) {
      roots.push(row)
    } else {
      const chief = byId.get(row.chiefId)
      if (chief && chief !== row) chief.subordinates.push(row)
    }
  })

  return roots
}

export function validName (name) {
  return typeof name === 'string' && name.trim().length > 0
}
