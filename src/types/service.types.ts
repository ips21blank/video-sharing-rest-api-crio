enum VOTE_TYPE {
  upVote = 'upVote',
  downVote = 'downVote'
}
enum VOTE_TYPE_CHANGE {
  increase = 'increase',
  decrease = 'decrease'
}

interface UpdateVotes {
  vote: VOTE_TYPE;
  change: VOTE_TYPE_CHANGE;
}

export { VOTE_TYPE, VOTE_TYPE_CHANGE };
export type { UpdateVotes };
