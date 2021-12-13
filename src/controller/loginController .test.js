const UserSchema = require("../models/usersSchema");
const loginController = require("../controller/loginController");
const mockingoose = require("mockingoose");
const jwt = require("jsonwebtoken");

describe("getLogin unit test", () => {
  test("success", async () => {
    mockingoose(UserSchema).toReturn(
      [{ email: "test@email.com", password: "123456" }],
      "find"
    );

    jest
      .spyOn(jwt, "sign")
      .mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlmNzExMzNlYzQ3ZTIwMTUwNzczOGMiLCJpYXQiOjE2Mzg3NTA4NDN9.e13u83p6cg6Quk8gk4dZ5pulc7uLhISqdAEF-wplyLE"
      );

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await loginController.createLogin(
      {
        body: {
          email: "test@email.com",
          password: "123456",
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Allowed access",
      code: "SUCCESS",
      data: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlmNzExMzNlYzQ3ZTIwMTUwNzczOGMiLCJpYXQiOjE2Mzg3NTA4NDN9.e13u83p6cg6Quk8gk4dZ5pulc7uLhISqdAEF-wplyLE",
      },
    });
  });

  test("fail and return 404 when email does not exists", async () => {
    mockingoose(UserSchema).toReturn([], "find");

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await loginController.createLogin(
      {
        body: {
          email: "test@email.com",
          password: "123456",
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "E-mail not found.",
      code: "NOT_FOUND_ERROR",
      data: null,
    });
  });

  test("fail and return 401 when password is incorrect", async () => {
    mockingoose(UserSchema).toReturn(
      [{ email: "test@email.com", password: "67890" }],
      "find"
    );

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await loginController.createLogin(
      {
        body: {
          email: "test@email.com",
          password: "123456",
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Incorrect password",
      code: "ERROR_INCORRECT_PASSWORD",
      data: null,
    });
  });
  test("fail and return 500 when password is incorrect", () => {});
});
