import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/User';
import { UserServiceService } from '../../Services/user-service.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserServiceService) { }

  public allUsers: User[];
  public directFriends: User[] = [];
  public suggestedFriends: User[] = [];

  public tempFriends1: any[] = [];
  public tempFriends2: any[] = [];
  public tempFriends3: any[] = [];
  public tempFriends: any[] = [];
  public uniqueFriends: any[] = [];



  ngOnInit() {
    this.userService.getAllUsers()
    .subscribe(data => this.allUsers = data)
  }

  userClick(data){
    this.directFriends = [];
    this.suggestedFriends = [];
    this.tempFriends1 = [];
    this.tempFriends2 = [];
    this.tempFriends3 = [];
    this.tempFriends = [];


    if(this.allUsers.length !== undefined){
    
      for(let i = 0; i < this.allUsers.length; i++){
        if(this.allUsers[i].id == data){
          //populate friends of friends list
          for(let j=0; j < this.allUsers[i].friends.length; j++ ){
            for(let k=0; k < this.allUsers.length; k++){
               if(this.allUsers[k].id == this.allUsers[i].friends[j]){
                 this.directFriends.push(this.allUsers[k]);
               }
            }
          } 

          //populate suggested friends list
            if(this.directFriends.length >= 2){
              for(let i = 0; i < this.directFriends.length; i++){
                for(let tmp1 = 0; tmp1 < this.directFriends[i].friends.length; tmp1++){
                  this.tempFriends1 = this.directFriends[i].friends[tmp1];

                        for(let j = this.directFriends.length - 1; j > i; j--){
                          for(let tmp2 =0; tmp2 < this.directFriends[j].friends[tmp2]; tmp2++){
                            this.tempFriends2 =  this.directFriends[j].friends[tmp2];

                            if(this.tempFriends1 == this.tempFriends2){
                                this.tempFriends.push(this.tempFriends1 );
                            }
                            
                            this.uniqueFriends = this.tempFriends.filter(this.onlyUnique)

                          }
                        }
                }
              }
              for(let i = 0; i < this.allUsers.length; i++){
                for(let j = 0; j < this.uniqueFriends.length; j++){
                  if(this.allUsers[i].id == this.uniqueFriends[j] && this.allUsers[i].id != data){
                    this.suggestedFriends.push(this.allUsers[i]);
                  }
                }
              }
            }
          }
        }
      }

    }

    onlyUnique(value, index, self): any { 
      return self.indexOf(value) === index;
    }


  }



