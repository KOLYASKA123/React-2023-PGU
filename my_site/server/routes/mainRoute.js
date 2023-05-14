import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {

    console.log('Query: ', req.body);
    const response = {
        ok: true,
        errMsg: 'Get method',
    };

    res.status(200).json(response).send();
});

router.post('/', (req, res) => {
    
    console.log('Body: ', req.body);
    const response = {
        ok: true,
        errMsg: 'Post method',
    }

    res.status(200).json(response).send()
})

export default router;