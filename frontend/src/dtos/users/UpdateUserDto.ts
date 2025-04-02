
type UpdateUserDto= {

  id: number;

  firstname?: string;

  profile?: string | null;

  email?: string;

  lastname?: string;

  password?: string;

  phone?: string;
}

export default UpdateUserDto;
