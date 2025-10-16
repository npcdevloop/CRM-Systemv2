export async function AllLoader (filter: string) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${filter}`
    )
    const resData = await response.json()
    return resData
  } catch {
    throw Response.json({ message: 'Could not fetch todos' }, { status: 500 })
  }
}

export async function Action ({ request }: { request: Request }) {
  const data = await request.formData()
  const method = request.method
  const tasksId = data.get('id')
  const title = data.get('title')
  const isDone = data.get('isDone')
  const url = 'https://easydev.club/api/v1/todos/'

  if (method === 'POST') {
    const taskData = {
      title: title,
      isDone: isDone
    }

    try {
      await fetch('https://easydev.club/api/v1/todos', {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
    } catch {
      throw new Response(JSON.stringify({ message: 'Could not save task.' }), {
        status: 500
      })
    }
  }

  if (method === 'PUT' && data.get('title')) {
    const taskData = {
      id: data.get('id'),
      title: data.get('title')
    }

    try {
      await fetch(url + tasksId, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
    } catch {
      throw new Response(JSON.stringify({ message: 'Could not save task.' }), {
        status: 500
      })
    }
  }

  if (method === 'PUT' && data.get('isDone')) {
    const taskData = {
      id: data.get('id'),
      isDone: JSON.parse(data.get('isDone') as string)
    }

    try {
      await fetch(url + tasksId, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
    } catch {
      throw new Response(JSON.stringify({ message: 'Could not save task.' }), {
        status: 500
      })
    }
  }

  if (method === 'DELETE') {
    try {
      await fetch(url + tasksId, {
        method: method
      })
    } catch {
      throw Response.json(
        { message: 'Could not delete event' },
        { status: 500 }
      )
    }
  }
}
