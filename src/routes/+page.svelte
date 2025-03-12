<script>
    import { Tabs, TabItem } from 'flowbite-svelte';
    import { UserCircleSolid, GridSolid, AdjustmentsVerticalSolid, ClipboardSolid } from 'flowbite-svelte-icons';
  </script>
  
  <Tabs tabStyle="underline">
    <TabItem open>
      <div slot="title" class="flex items-center gap-2">
        <UserCircleSolid size="md" />
        Profile
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Profile:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
    <TabItem>
      <div slot="title" class="flex items-center gap-2">
        <GridSolid size="md" />
        Dashboard
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Dashboard:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs>