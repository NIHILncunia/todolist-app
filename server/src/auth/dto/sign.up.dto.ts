import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public userName: string;

  @IsNotEmpty()
  public password: string;
}
