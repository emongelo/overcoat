exports.coats = [
	{
		id: 1,
		user: {
			"id": "1",
			"avatar": "/statics/images/avatar-01.png",
			"name": "Shauna Vaughan",
			"screenName": "Mayra.Skinner",
			"email": "mayraskinner@kozgene.com",
			"registered": "2014-08-31T04:15:59 +03:00",
			"followers": 123,
			"coats": 123,
			"following": 432,
			"upvotes": 84
		},
		site: {
			id: 1,
			name: "www.whitehouse.gov"
		},
		message: "Este sitio de mierda no funca. Por que son tan imbeciles? Cuando van a adoptar bitcoin y se dejan de joder?",
		upvotes: 34,
		downvotes: 21,
		tips: 0,
		shares: 33,
		replies: [ ]
	},
	{
		id: 2,
		site: {
			id: 1,
			name: "www.whitehouse.gov"
		},
		message: "Deberían poner una foto como esta en la portada, quedaría mejor",
		upvotes: 34,
		downvotes: 21,
		tips: 0,
		shares: 33,
		picture: "/statics/images/photo.png",
		user: {
			id: "1",
			avatar: "/statics/images/avatar-01.png",
			name: "Shauna Vaughan",
			screenName: "Mayra.Skinner",
			email: "mayraskinner@kozgene.com",
			registered: "2014-08-31T04:15:59 +03:00",
			followers: 123,
			coats: 123,
			following: 432,
			upvotes: 84
		},
		replies: [ ]
	},
	{
		id: 3,
		site: {
			id: 1,
			name: "www.whitehouse.gov"
		},
		message: "Esta pagina es una porquería",
		upvotes: 34,
		downvotes: 0,
		tips: 0,
		shares: 33,
		user: {
			id: "2",
			avatar: "/statics/images/avatar-02.png",
			name: "Hebert Mcdowell",
			screenName: "Nola.Pruitt",
			email: "nolapruitt@kozgene.com",
			registered: "2015-05-16T18:05:37 +03:00",
			followers: 123,
			coats: 123,
			following: 432,
			upvotes: 84
		},
		replies: [
			{
				id: 1,
				coatId: 3,
				site: {
					id: 1,
					name: "www.whitehouse.gov"
				},
				message: "Es una maza el sitio daltónico",
				upvotes: 2,
				downvotes: 5,
				tips: 4,
				shares: 19,
				user: {
					id: "1",
					avatar: "/statics/images/avatar-01.png",
					name: "Shauna Vaughan",
					screenName: "Mayra.Skinner",
					email: "mayraskinner@kozgene.com",
					registered: "2014-08-31T04:15:59 +03:00",
					followers: 123,
					coats: 123,
					following: 432,
					upvotes: 84
				},
				replies: []
			},
			{
				id: 2,
				coatId: 3,
				site: {
					id: 1,
					name: "www.whitehouse.gov"
				},
				message: "Horrible igual que vos salame",
				upvotes: 3456,
				downvotes: 294,
				tips: 6,
				shares: 19,
				replies: [
					{
						id: 2,
						userId: 1,
						coatId: 3,
						replyId: 2,
						site: {
							id: 1,
							name: "www.whitehouse.gov"
						},
						message: "Reply de reply",
						upvotes: 99,
						downvotes: 245,
						tips: 9,
						shares: 39,
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
					}
				],
				user: {
					id: "2",
					avatar: "/statics/images/avatar-02.png",
					name: "Hebert Mcdowell",
					screenName: "Nola.Pruitt",
					email: "nolapruitt@kozgene.com",
					registered: "2015-05-16T18:05:37 +03:00",
					followers: 123,
					coats: 123,
					following: 432,
					upvotes: 84
				}
			}
		]
	}
];