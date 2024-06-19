import { validateSchema } from "./validation-schema";

export class CalculateChallengeDto {

    private constructor(
      public readonly bucketX: number,
      public readonly bucketY: number,
      public readonly amountWantedZ: number,
    ){}
  
  
    static calculateChallenge( props: {[key:string]: any} ): [string?, CalculateChallengeDto?]  {
  
      const { bucketX, bucketY, amountWantedZ } = props;
  
      const validation = validateSchema({ bucketX, bucketY, amountWantedZ });

      if (validation instanceof Error) { 
        return [
          validation.message.replace(/[\\"]/g, '').replace(/\b[\w]/g, l => l.toUpperCase()), 
          undefined
        ] 
      };
      
      return [undefined, new CalculateChallengeDto(bucketX, bucketY, amountWantedZ)];
    }
}