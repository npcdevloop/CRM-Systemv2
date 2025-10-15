export async function AllLoader () {
  const response = await fetch('https://easydev.club/api/v1/todos')
  if (!response.ok) {
    throw Response.json({ message: 'Could not fetch todos' }, { status: 500 })
  } else {
    const resData = await response.json()
    return resData
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

    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })

    checkRespons(response)
  }

  if (method === 'PUT' && data.get('title')) {
    const taskData = {
      id: data.get('id'),
      title: data.get('title')
    }

    const response = await fetch(url + tasksId, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })

    checkRespons(response)
  }

  if (method === 'PUT' && data.get('isDone')) {
    const taskData = {
      id: data.get('id'),
      isDone: JSON.parse(data.get('isDone') as string)
    }

    const response = await fetch(url + tasksId, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })

    checkRespons(response)
  }

  if (method === 'DELETE') {
    const response = await fetch(url + tasksId, {
      method: method
    })
    if (!response.ok) {
      throw Response.json(
        { message: 'Could not delete event' },
        { status: 500 }
      )
    }
  }
}

function checkRespons (response: Response) {
  if (response.status === 422) {
    return response
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save task.' }), {
      status: 500
    })
  }
}
