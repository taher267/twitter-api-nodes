exports.statusesDestroy = async (req, res, next) => {
  try {
    const { id, id_str } = req.params;
    if (!isValidObjectId(id)) throw error(`Invalid params id`);
    const currentUser = await findUser('_id', id);
    if (!currentUser) throw error(`User not found`);
    let { token, token_secret } = currentUser;

    try {
      const deleteStatuses = await twitApi(
        token,
        token_secret,
        'statusesDestroy',
        { id: id_str }
      );
      res.status(200).json({ msg: 'Alhamdu lillah', deleteStatuses });
    } catch (err) {
      throw error(err?.[0]?.message);
    }
  } catch (e) {
    next(e);
  }
};
