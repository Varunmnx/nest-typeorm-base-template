// import { IoAdapter } from '@nestjs/platform-socket.io'; 
// import { AuthenticatedSocket } from '@/common/socket/authenticated-socket.dto';
// // import { AuthService } from '@/auth/services/auth.service';
// // import { UserRepository } from '@/auth/Repositories/user.repositories'; 
// import { INestApplication } from '@nestjs/common';

// export class WebsocketAdapter extends IoAdapter {
//   // private readonly userRepository: UserRepository;
//   // private readonly authService: AuthService
//   constructor(app: INestApplication) {
//     super(app);
//     // this.userRepository = app.get(UserRepository)
//     // this.authService = app.get(AuthService)

//   }
//   createIOServer(port: number, options?: any) {   
//     const server = super.createIOServer(port, options);
//     server.use(async (socket: AuthenticatedSocket, next) => {
//       console.log('Inside Websocket Adapter'); 
//       if(!socket.handshake.headers.authorization){
//           return next(new Error('Not Authenticated. No token were sent'));
//       } 
//       // const payload = await this.authService.verify({token:socket.handshake.headers.authorization})
//       // const user = await  this.userRepository.findById(payload.userId) 
//       // if (!payload) {
//       //   console.log('NO USER WITH ID FOUND');
//       //   return next(new Error('USER NOT AVAILABLE'));
//       // }  
//       socket.user = null;
//       next();
//     });
//     return server;
//   }
// }
