const postController = require("../controller/postController");
const mockingoose = require("mockingoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mocks = require("node-mocks-http");
const UserSchema = require("../models/usersSchema");

describe("createPost unit tests", () => {
  test("success", async () => {
    const post = {
      photo: "arquivo.png",
      address: {
        postalCode: "56789000",
        street: "Rua Mossoro",
        number: 99,
        district: "Riacho das Pedras",
        city: "Contagem",
      },
      description:
        "Preto com orelha manchada, esta proximo a padaria do senhor Zé",
      situation: {
        lifeRisk: true,
        hurted: false,
        identified: false,
        losted: true,
        pregnant: false,
        puppy: false,
      },
      alreadySeen: true,
      necessity: {
        rescue: false,
        transportation: true,
        temporaryHome: true,
      },
    };

    jest
      .spyOn(jwt, "verify")
      .mockReturnValue({ userId: "61b79002f82f7f813b745881", iat: 1639419936 });

    mockingoose(UserSchema).toReturn([post], "save");

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    const req = mocks.createRequest({
      body: post,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlmNzExMzNlYzQ3ZTIwMTUwNzczOGMiLCJpYXQiOjE2Mzg3NTA4NDN9.e13u83p6cg6Quk8gk4dZ5pulc7uLhISqdAEF-wplyLE",
      },
    });

    await postController.createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
