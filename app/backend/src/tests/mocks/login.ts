export const mockForFindOne = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'password',
};

export const mockForValid = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const mockForInvalidPassword = {
  email: 'admin@admin.com',
  password: '123456',
};

export const mockForInvalidEmail = {
  email: 'admiadmin.com',
  password: 'secret_admin',
};

export const mockWithoutEmail = {
  password: 'password',
};

export const mockRightResponse =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY2NjM5MzM0OSwiZXhwIjoxNjY3MjU3MzQ5fQ.0h2eWInBopIUHIZm2kxCRydo8FmTYCQ1C-t7OhNyl80';
