import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'team-generator';
  newMemberName = "";
  members: string[] = [];
  errMessage = "";
  numOfTeams: number | "" = "";
  teams:string[][] = [] 

  onInput(member:string){
    this.newMemberName = member;
    console.log(this.newMemberName);
    
  }

  onNumOfTeamsInput(value:string){
    this.numOfTeams = Number(value);
  }
  
  addMember(){
    if(!this.newMemberName){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:"Names cannot be empty"
      })
    }
    else{
      this.members.push(this.newMemberName)
      console.log(this.members);
      this.newMemberName = "";
      this.errMessage = "";
    }
  }

  generateTeams(){
    if(!this.numOfTeams || this.numOfTeams <= 0 ){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:"Invalid Number of Teams"
      })
      return
    }
    if(this.members.length < this.numOfTeams){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:"Not enough members. Add another one."
      })
      return
    }

    this.errMessage=""
    const allMembers = [...this.members]
    while(allMembers.length){
      for(let i=0; i<this.numOfTeams; i++){
        const randomIndex = Math.floor(Math.random()* allMembers.length)
        console.log(randomIndex);
        const member = allMembers.splice(randomIndex,1)[0]
        if(!member)break
        if(this.teams[i]){
          this.teams[i].push(member)
        }
        else{
          this.teams[i] = [member]
        }
      }
    }
    console.log(this.teams);
    this.members = []
      this.numOfTeams = ""
  }
}
