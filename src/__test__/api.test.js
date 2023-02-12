import { getTodos, getTodo, getUsers, todosUrl, usersUrl } from "../api"

describe("getTodos", () => {
  it("fetches todos from the API and returns them", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "Test Todo",
          userId: 1,
        },
      ]),
      ok: true,
    })

    global.fetch = mockFetch

    const result = await getTodos()
    expect(result).toEqual([
      {
        id: 1,
        title: "Test Todo",
        userId: 1,
      },
    ])
    expect(mockFetch).toHaveBeenCalledWith(todosUrl)
  })

  it("returns an empty array when the API request fails", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    global.fetch = mockFetch

    const result = await getTodos()
    expect(result).toEqual([])
    expect(mockFetch).toHaveBeenCalledWith(todosUrl)
  })
})

describe("getTodo", () => {
  it("should return a todo object for a given id", async () => {
    const mockData = {
      id: 1,
      title: "Todo 1",
      userId: 1,
      completed: false,
    }
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    )
    const id = 1
    const result = await getTodo(id)
    expect(result).toEqual(mockData)
  })

  it("should return an empty object for a failed fetch request", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    )
    const id = 1
    const result = await getTodo(id)
    expect(result).toEqual({})
  })
})

describe("getUsers", () => {
  it("should return the list of users when the API call is successful", async () => {
    const mockResponse = new Response(
      JSON.stringify([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
              lat: "-43.9509",
              lng: "-34.4618",
            },
          },
          phone: "010-692-6593 x09125",
          website: "anastasia.net",
          company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
          },
        },
      ]),
      { status: 200 }
    )
    fetch.mockResolvedValue(mockResponse)

    const users = await getUsers()
    expect(users).toEqual([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618",
          },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
    ])
    expect(fetch).toHaveBeenCalledWith(usersUrl)
  })

  it("should return an empty array when the API call fails", async () => {
    fetch.mockRejectedValue(new Error("Failed to fetch data"))

    const users = await getUsers()
    expect(users).toEqual([])
    expect(fetch).toHaveBeenCalledWith(usersUrl)
  })
})
