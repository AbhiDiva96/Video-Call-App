import { User } from "./UserManager";


let GLOBAL_ROOM_Id = 1;

interface Room {
    user1 : User,
    user2 : User,
}


export class RoomManager {

    private rooms: Map<string, Room>
     constructor(){
         this.rooms = new Map<string, Room>()
     }

     createRoom(user1: User, user2: User)
     {
        const roomId = this.generate().toString();
        this.rooms.set(roomId.toString(), {
            user1,
            user2,
        })

        user1.socket.emit("send-offer", {
            roomId
        })

        user2.socket.emit("send-offer", {
            roomId
        })
     }


    onOffer(roomId: string, sdp: string, senderSocketid: string){
         const room = this.rooms.get(roomId);
         if(!room)
         {
            return;
         }
         const recevingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
         recevingUser?.socket.emit("offer", {
            sdp,
            roomId
         })
    }

     onAnswer(roomId: string, sdp: string, senderSocketid: string){
        const room = this.rooms.get(roomId);
        if(!room){
            return;
        }
        const recevingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;

        recevingUser?.socket.emit("answer", {
            sdp,
            roomId
        })
        
     }

     onIceCandidates(roomId: string, senderSocketid: string, candidate : any, type: "sender" | "receriver"){
          const room = this.rooms.get(roomId);
          if(!room){
            return;
          }

          const recevingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
           recevingUser.socket.emit("add-ice-candidate", ({
            candidate, 
            type
           }))
     }

     generate() {
        return GLOBAL_ROOM_Id++;
     }

}

 