import prisma from "@/lib/prisma";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { revalidatePath } from "next/cache";


export const Section = async () => {

    async function createTodo(data: FormData) {
        'use server'
        const title = data.get('title') as string
        const description = data.get('description') as string

        if (!title || !description) return
        await prisma.todo.create({
            data: {
                title,
                description,
            }
        })

        revalidatePath('/')

    }

    const todos = await prisma.todo.findMany()

    if (!todos) return


    return (
        <>
            <div className="max-w-[300px] mx-auto">
                {
                    todos.map(todo => (
                        <div className="my-3">
                            <div className="flex items-center justify-start">
                                <Checkbox defaultSelected={todo.done} size="lg" color="success" />
                                <div className="text-lg font-semibold">{todo.title}</div>
                            </div>
                            <div className="text-xs text-neutral-500">
                                {todo.description}
                            </div>
                        </div>
                    ))
                }
            </div>
            <Divider orientation="horizontal" className="my-4" />
            <div className="max-w-[300px] mx-auto">
                <form action={createTodo} className="flex flex-col items-center justify-center gap-4" >
                    <Input variant="bordered" type="text" label="Title" name="title" />
                    <Input variant="bordered" type="text" label="Description" name="description" />

                    <Button type="submit" color="success" variant="flat" size="lg" className="w-full">Guardar</Button>
                </form>
            </div>
        </>
    )
}


