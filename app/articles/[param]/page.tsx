export default async function Page({ params }: { params: { param: string }} ) {
    const param = await params;
    return <div>This is the article page {param.param}</div>
}