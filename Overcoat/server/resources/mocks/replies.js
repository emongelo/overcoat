exports.replies = [
  {
    id: 1,
    userId: 1,
    coatId: 3,
    siteId: 1,
    message: "Es una maza el sitio daltónico",
    upvotes: 2,
    downvotes: 5,
    tips: 4,
    shares: 19,
    picture: undefined
  },
  {
    id: 2,
    userId: 2,
    coatId: 3,
    siteId: 1,
    message: "Horrible igual que vos salame",
    upvotes: 3456,
    downvotes: 294,
    tips: 6,
    shares: 19,
    picture: undefined,
    replies: [{ 
        id: 2,
        userId: 1,
        coatId: 3,
        replyId: 2,
        siteId: 1,
        message: "Reply de reply",
        upvotes: 99,
        downvotes: 245,
        tips: 9,
        shares: 39,
        picture: undefined,
        user: {
            avatar: "/statics/images/avatar-01.png",
            coats: 123,
            email: "mayraskinner@kozgene.com",
            followers: 123,
            following: 432,
            id: "1",
            name: "Shauna Vaughan",
            registered: "2014-08-31T04:15:59 +03:00",
            screenName: "Mayra.Skinner",
            upvotes: 84
        }
    }]
  }
];
