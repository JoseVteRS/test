import prisma from "@/lib/prisma";

export default async function TodoLayout({
    children
}: {
    children: React.ReactNode;
}) {


    const todos = await prisma.todo.findMany()


    return (
        <div>
            <aside>
                <ul>
                    {
                        todos.map(todo => (
                            <li>{todo.title}</li>
                        ))
                    }
                </ul>
            </aside>

            <section className="" >
                {children}
            </section>
        </div>
    );
}