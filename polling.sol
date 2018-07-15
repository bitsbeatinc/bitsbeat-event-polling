pragma solidity ^0.4.21;

contract WorldCupPollingContract {
    
  struct voteCountStruct {
      uint64 france;
      uint64 croatia;
    }
    struct voteStruct{
        bool vote;
        uint8 flag;
    }
   voteCountStruct  totalVotes;
  mapping (address=>voteStruct) votesMapping;
  event VotedEvent (address votedBy,bool votedFor);
  
// not needed if don't need to initialze
   constructor()  public {
      
  }
   
   function doVote(bool _userVote) public{
     require(votesMapping[msg.sender].flag!= 1);
       voteStruct memory newUserVote;
       newUserVote.vote = _userVote;
       newUserVote.flag =1;
      votesMapping[msg.sender] = newUserVote;
      if(_userVote)
        totalVotes.france++;
        else
        totalVotes.croatia++;
        emit VotedEvent(msg.sender,_userVote);
        }
   
   function getVoteCount() public view returns(int france,int croatia){
       return  (totalVotes.france,totalVotes.croatia);
   }
   
   function getMyVote() public view returns (string country){
       require(votesMapping[msg.sender].flag== 1);
       if(votesMapping[msg.sender].vote)
       return "france";
       else
       return "croatia";   
   }
    function isVoted() public view returns (bool){
       if(votesMapping[msg.sender].flag ==1)
       return true; 
       else 
       return false;
   }
}