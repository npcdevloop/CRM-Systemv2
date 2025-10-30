import type { timerId } from "../types/interface";

function ProfilePage({ returnTimerId }: timerId) {
    clearTimeout(returnTimerId!() ?? 0)
    return (<>
        <h1>Привет</h1>
    </>);
}

export default ProfilePage;