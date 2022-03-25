import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [basic, setBasic] = useState(true)

    useEffect(() => {
        // "user/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
        Api.get("user", portfolioOwnerId).then((res) => setUser(res.data));
    }, [portfolioOwnerId]);

    return (
    <>
        {isEditing ? (
            <UserEditForm
                user={user}
                setIsEditing={setIsEditing}
                setUser={setUser}
                setImage={setImage}
                setBasic={setBasic}
                image={image}
            />
        ) : (
            <UserCard
                user={user}
                setIsEditing={setIsEditing}
                isEditable={isEditable}
                image={image}
                basic={basic}
            />
        )}
    </>
    );
}

export default User;
