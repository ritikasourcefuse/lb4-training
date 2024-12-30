// import {repository} from '@loopback/repository';
// import {post, get, requestBody, HttpErrors} from '@loopback/rest';
// import {hash, compare} from 'bcryptjs';
// import {UserRepository} from '../repositories/user.repository';
// import {User} from '../models/user.model';
// import {JWTService, MyUserProfile, TokenServiceBindings} from 'shared';
// import {inject} from '@loopback/core';
// import {securityId} from '@loopback/security';

// export class UserController {
//   constructor(
//     @repository(UserRepository) public userRepository: UserRepository,
//     @inject(TokenServiceBindings.SERVICE) private jwtService: JWTService,
//   ) {}

//   @post('/signup')
//   async signup(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: {
//             type: 'object',
//             properties: {
//               email: {type: 'string'},
//               password: {type: 'string'},
//               confirmPassword: {type: 'string'},
//               role: {
//                 type: 'string',
//                 enum: ['SuperAdmin', 'Admin', 'Subscriber'],
//                 default: 'Subscriber',
//               },
//             },
//             required: ['email', 'password', 'confirmPassword'],
//           },
//         },
//       },
//     })
//     userData: {
//       email: string;
//       password: string;
//       confirmPassword: string;
//     },
//   ) {
//     if (userData.password !== userData.confirmPassword) {
//       throw new HttpErrors.UnprocessableEntity('Passwords do not match');
//     }
//     const existingUser = await this.userRepository.findOne({
//       where: {email: userData.email},
//     });
//     if (existingUser) {
//       throw new HttpErrors.Conflict('Email is already in use');
//     }
//     const passwordHash = await hash(userData.password, 10);
//     const newUser = await this.userRepository.create({
//       email: userData.email,
//       password: passwordHash,
//     });

//     // Exclude sensitive fields
//     return {
//       message: 'User registered successfully',
//       user: {id: newUser.id, email: newUser.email, role: newUser.role},
//     };
//   }

//   @post('/login')
//   async login(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: {
//             type: 'object',
//             properties: {
//               email: {type: 'string'},
//               password: {type: 'string'},
//             },
//             required: ['email', 'password'],
//           },
//         },
//       },
//     })
//     credentials: {
//       email: string;
//       password: string;
//     },
//   ) {
//     const user = await this.userRepository.findOne({
//       where: {email: credentials.email},
//     });
//     if (!user) {
//       throw new HttpErrors.Unauthorized('Invalid email or password');
//     }

//     const isPasswordValid = await compare(credentials.password, user.password);
//     if (!isPasswordValid) {
//       throw new HttpErrors.Unauthorized('Invalid email or password');
//     }

//     const userProfile: MyUserProfile = {
//       id: user.id,
//       email: user.email,
//       roles: [user.role],
//       [securityId]: user.id,
//     };
//     const token = await this.jwtService.generateToken(userProfile);

//     return {
//       message: 'Login successfull',
//       token,
//     };
//   }

//   @post('/users')
//   async createUser(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: {
//             type: 'object',
//             properties: {
//               email: {type: 'string'},
//               password: {type: 'string'},
//               role: {type: 'string'},
//             },
//             required: ['email', 'password'],
//           },
//         },
//       },
//     })
//     userData: Omit<User, 'id'>,
//   ): Promise<User> {
//     const passwordHash = await hash(userData.password, 10); // Ensure password is hashed
//     return this.userRepository.create({...userData, password: passwordHash});
//   }

//   @get('/users')
//   async getAllUsers(): Promise<User[]> {
//     return this.userRepository.find();
//   }
// }
