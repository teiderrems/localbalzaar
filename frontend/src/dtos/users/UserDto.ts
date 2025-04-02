type UserDto= {

  id: number;

  email: string;

  firstname: string | null;

  lastname: string | null;

  phone: string | null;

  createdAt: Date;

  updatedAt: Date;
}

export default UserDto;
