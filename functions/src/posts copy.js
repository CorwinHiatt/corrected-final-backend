import dbConnect from "./dbConnect.js";


export async function getAllPosts(req, res) {
  const db = dbConnect();
  const collection = await db.collection('posts').get()
    .catch(err => res.status(500).send(err));
  const posts = collection.docs.map(doc => ({ ...doc.data(), photoId: doc.id }));
  res.send(posts);

}

export async function addPost(req, res) {
  const newPost = req.body
  const db = dbConnect()
  await db.collection('posts').add(newPost)
    .catch(err => res.status(500).send(err))
  getAllPosts(req, res)
}


export async function updatePost(req, res) {
  const { uid } = req.params
  const db = dbConnect()
  const doc = await db.collection('posts').doc(uid).update(req.body)
      .catch(err => res.status(500).send({ success: false, message: err }))
  res.status(202).send({ success: true, message: 'Post Updated ' + uid })
}

export async function deletePost(req, res) {
  const { uid } = req.params
  const db = dbConnect()
  const doc = await db.collection('posts').doc(uid).delete()
      .catch(err => res.status(500).send({ success: false, message: err }))
  res.status(202).send({ success: true, message: 'Post Deleted' })
}

export async function getOnePost(req, res) {
  const { uid } = req.params
  const db = dbConnect()
  const doc = await db.collection('posts').doc(uid).get()
  res.status(202).send({ success: true, message: doc.data() })
}
