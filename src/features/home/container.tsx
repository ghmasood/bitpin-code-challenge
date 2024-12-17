import { Button } from '@/shared/UI/button';
import { Input } from '@/shared/UI/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/UI/tabs';
import type { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div>
      <Button>aa</Button>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>tab 1</TabsContent>
        <TabsContent value='password'>tab2</TabsContent>
      </Tabs>
      <Input />
    </div>
  );
};

export { HomePage };
