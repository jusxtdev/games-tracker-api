export const validate = (schema) => {
    return (req, res, next) => {
        const requestBody = req.body

        const valid = schema.safeParse(requestBody)

        if (!valid.success){
            const errorMessage = valid.error.issues.map((issue) => issue.message).join(', ')
            return res.status(400).json({
                success : false,
                msg : errorMessage
            })
        }
        next()
    }
}
