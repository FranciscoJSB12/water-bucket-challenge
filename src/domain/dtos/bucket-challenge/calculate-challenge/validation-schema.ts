import * as joi from 'joi';

interface CalculationData {
    bucketX: number;
    bucketY: number;
    amountWantedZ: number;
}

export const validateSchema = (data: CalculationData): CalculationData | Error => {
    const validationSchema = joi.object({
        bucketX: joi.number().integer().min(1).required(),
        bucketY: joi.number().integer().min(1).required(),
        amountWantedZ: joi.number().integer().min(1).required(),
    });
    
    const { error, value } = validationSchema.validate(data, { abortEarly: false });
    
    if (error) return new Error(error.message);
    
    return value;
}

