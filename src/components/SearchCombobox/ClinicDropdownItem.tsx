interface ClinicDropdownItemProps {
  item: {
    id: number;
    name: string;
    address: {
      city: string;
      state: string;
    };
  };
}

const ClinicDropdownItem = ({ item }: ClinicDropdownItemProps) => {
  return (
    <div key={item.id}>
      <p className="text-base font-medium tracking-tight">{item.name}</p>
      <ul className="text-sm flex place-items-center">
        <li className="inline-block text-muted-foreground truncate max-w-24">
          {item.address.city}, <span className="uppercase">{item.address.state}</span>
        </li>
        <li className="inline-block ms-2 before:content-['•'] before:mr-2 before:text-muted-foreground">
          <span className="pb-1 underline">Go to this clinic</span>
        </li>
      </ul>
    </div>
  );
};

export default ClinicDropdownItem;
