'use client';

import { useActionState, FormEvent, startTransition } from 'react';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';

import { createPost } from '@/actions';
import FormButton from '../common/form-button';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({
  slug,
}: Readonly<PostCreateFormProps>) {
  const [formState, action, isPending] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {},
    },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Post</h3>
            <Input
              name='title'
              label='title'
              labelPlacement='outside'
              placeholder='Title'
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              name='content'
              label='content'
              labelPlacement='outside'
              placeholder='Content'
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            {formState.errors._form ? (
              <div className='p-2 bg-red-200 border rounded border-red-400'>
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
