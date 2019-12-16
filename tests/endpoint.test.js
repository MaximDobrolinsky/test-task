const request = require('supertest');
const app = require('../build/app').default;
const UserModel = require('../build/db/schemas/user.schema').UserModel;
const TaskModel = require('../build/db/schemas/task.schema').TaskModel;

let user;
let token;
let task;

describe('Login', () => {
  it('register user', async (done) => {
    const registerDto = {
      email: 'test1@gmail.com',
      name: 'test',
      password: 'test',
    }

    const res = await request(app)
      .post('/auth/register')
      .send(registerDto);

    user = res.body;

    expect(res.status).toBe(200);
    expect(user).toBeDefined();
    expect(user._id).toBeTruthy();
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(user.password).toBeTruthy();

    return done();
  });

  it('login user', async (done) => {
    const loginDto = {
      email: 'test1@gmail.com',
      password: 'test',
    };

    const res = await request(app)
      .post('/auth/login')
      .send(loginDto);

    token = res.body.token;
    expect(res.status).toBe(200);
    expect(token).toBeDefined();
    expect(typeof token === 'string').toBe(true);

    return done();
  });
});

describe('User', () => {
  it('create user', async (done) => {
    const createUserDto = {
      email: 'test2@gmail.com',
      name: 'test',
      password: 'test',
    }

    const res = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${token}`)
      .send(createUserDto);

    const _user = res.body;

    expect(res.status).toBe(200);
    expect(_user).toBeDefined();
    expect(_user._id).toBeTruthy();
    expect(_user.name).toBeTruthy();
    expect(_user.email).toBeTruthy();
    expect(_user.password).toBeTruthy();

    return done();
  });

  it('get all users', async (done) => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`);

    const users = res.body;

    expect(res.status).toBe(200);
    expect(users).toBeDefined();
    expect(users.length).toBeDefined();

    return done();
  });

  it('get user by id', async (done) => {
    const res = await request(app)
      .get(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    const _user = res.body;

    expect(res.status).toBe(200);
    expect(_user).toBeDefined();
    expect(_user.name).toBeTruthy();
    expect(_user.email).toBeTruthy();
    expect(_user.password).toBeTruthy();

    return done();
  });
});

describe('Task', () => {
  it('create task', async (done) => {
    const createTaskDto = {
      title: 'task 1',
      description: 'task 1 desctiption',
      doneTime: new Date(),
      remindeTime: new Date(),
      isCompleted: true,
    };
  
    const res = await request(app)
      .post(`/task`)
      .set('Authorization', `Bearer ${token}`)
      .send(createTaskDto);
  
    task = res.body;
  
    expect(res.status).toBe(200);
    expect(task).toBeDefined();
    expect(task.title).toBeTruthy();
    expect(task.description).toBeTruthy();
    expect(task.doneTime).toBeTruthy();
    expect(task.remindeTime).toBeTruthy();
    expect(task.isCompleted).toBeTruthy();
  
    return done();
  });

  it('get all tasks', async (done) => {
    const res = await request(app)
      .get('/task')
      .set('Authorization', `Bearer ${token}`);

    const tasks = res.body;

    expect(res.status).toBe(200);
    expect(tasks).toBeDefined();
    expect(tasks.length).toBeDefined();

    return done();
  });

  it('get task by id', async (done) => {
    const res = await request(app)
      .get(`/task/${task._id}`)
      .set('Authorization', `Bearer ${token}`);

    const _task = res.body;

    expect(res.status).toBe(200);
    expect(_task).toBeDefined();
    expect(_task.title).toBeTruthy();
    expect(_task.description).toBeTruthy();
    expect(_task.doneTime).toBeTruthy();
    expect(_task.remindeTime).toBeTruthy();
    expect(_task.isCompleted).toBeTruthy();

    return done();
  });

  it('update task', async (done) => {
    const updateTaskDto = {
      title: 'updated task',
    };

    const res = await request(app)
      .put(`/task/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateTaskDto);

    const _task = res.body;

    expect(res.status).toBe(200);
    expect(_task).toBeDefined();
    expect(_task.title === task.title).not.toBe(true);

    return done();
  });
});


afterAll(async () => {
  await UserModel.remove({});
  await TaskModel.remove({});
});