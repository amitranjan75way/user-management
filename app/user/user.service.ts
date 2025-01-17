
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";


export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data, active: true });
    return result;
};

export const isUserExistByEamil = async(email: string) => {
    const user = await UserSchema.findOne({email: email});
    if(user) {
        return true;
    }else{
        return false;
    }
}

export const findUserByEmail = async(email: string) => {
    const user = await UserSchema.findOne({email: email});
    return user;
}

export const updateRefreshToken = async (id: string, refreshToken: string) => {
    const user = await UserSchema.findByIdAndUpdate(id,
        {refreshToken},
        {new: true}
    );
    return user;
}

export const addUserByAdmin = async(data: IUser) => {
    data.password = "12345";
    const user = UserSchema.create(data);
    return user;
}

export const resetPassword = async(email: string, newPassword: string) => {
    let user = await UserSchema.findOne({email: email});
    if (user) {
        user.password = newPassword;
        await user.save();
    }
    return user;
}

export const blockUser = async(id: string) => {
    let user = await UserSchema.findByIdAndUpdate(id, {active: false}, {new: true});
    return user;
}

export const unblockUser = async(id: string) => {
    let user = await UserSchema.findByIdAndUpdate(id, {active: true}, {new: true});
    return user;
}

export const findUsersByDateRange = async (startDate: string, endDate: string) => {
    const users = await UserSchema.find({
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).lean();
    return users;
};

export const findAllUsers = async () => {
    const users = await UserSchema.find({}).lean();
    return users;
}; 






// export const updateUser = async (id: string, data: IUser) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
//         new: true,
//     });
//     return result;
// };

// export const editUser = async (id: string, data: Partial<IUser>) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
//     return result;
// };

// export const deleteUser = async (id: string) => {
//     const result = await UserSchema.deleteOne({ _id: id });
//     return result;
// };

// export const getUserById = async (id: string) => {
//     const result = await UserSchema.findById(id).lean();
//     return result;
// };

// export const getAllUser = async () => {
//     const result = await UserSchema.find({}).lean();
//     return result;
// };
export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email }).lean();
    return result;
};

