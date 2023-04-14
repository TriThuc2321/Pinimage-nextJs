import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import Image from 'next/image';

import grey from '~/assets/grey.png';
import { authApi, userApi } from '~/services/apis';

function Login() {
    const router = useRouter();
    const auth = getAuth();

    if (auth.currentUser) router.push('/');

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName, email, photoURL },
        } = await signInWithPopup(auth, provider);

        const newUser = {
            name: displayName,
            uid,
            email: email ? email : '',
            picture: photoURL,
        };
        const accessToken = await auth.currentUser?.getIdToken();
        await authApi.login(accessToken);
        await userApi.createUser(newUser);

        router.replace('/');
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="mx-6 desktop:w-1/3 px-6 py-8 bg-primary text-white rounded-lg">
                <p style={{ fontSize: '26px', fontWeight: 'bold' }}>Pinimage</p>
                <p className="mt-2">
                    What do you want to try next? Think of something you’re into—like “astronaut in space” and see what
                    you create.
                </p>

                <div
                    className="flex rounded-xl bg-white items-center mt-6 cursor-pointer p-2 justify-center"
                    onClick={handleLoginWithGoogle}
                >
                    <Image
                        className="h-6 w-6 "
                        src={grey}
                        loader={() => 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}
                        alt=""
                    />
                    <p className="ml-4 text-primary font-bold">Login with google</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
