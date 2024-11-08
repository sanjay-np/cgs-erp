import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth }) {
    return (
        <Authenticated user={auth?.user} activeKey={['products']}>
        </Authenticated>
    )
}