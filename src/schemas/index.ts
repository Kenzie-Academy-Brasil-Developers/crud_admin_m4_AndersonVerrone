import { 
    courseCreateSchema, 
    courseReadSchema, 
    courseSchema, 
    courseUpdateSchema 
} from "./course.schemas";

import { 
    reqLoginSchema, 
    resLoginSchema 
} from "./login.schemas";

import { 
    userCreateSchema, 
    userReadSchema, 
    userReturnSchema, 
    userSchema, 
    userUpdateSchema 
} from "./user.schemas";

import { 
    userCoursesSchema 
} from "./userCourse.schemas";

export {
    userSchema,
    userCreateSchema,
    userUpdateSchema,
    userReturnSchema,
    userReadSchema,
    courseSchema,
    courseCreateSchema,
    courseUpdateSchema,
    courseReadSchema, 
    reqLoginSchema, 
    resLoginSchema,
    userCoursesSchema
}