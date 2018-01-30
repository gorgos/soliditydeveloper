import InPlaceEditingPlaceholder from 'Components/InPlaceEditingPlaceholder';
import SchemaDotOrg from 'Components/SchemaDotOrg';

Scrivito.provideComponent('AddressWidget', ({ widget }) => {
  return (
    <div>
      { widget.get('showLogo') !== 'no' && <Logo /> }
      <address>
        <Address addressWidget={ widget } />
        <Table
            phone={ widget.get('phone') }
            mobile={ widget.get('mobile') }
            fax={ widget.get('fax') }
            eMail={ widget.get('eMail') }
          />
        <SchemaDotOrg content={ widget } />
      </address>
      { widget.get('showBorderBottom') === 'yes' && <div className="border-bottom" /> }
    </div>
  );
});

const Logo = Scrivito.connect(() => {
  const root = Scrivito.Obj.root();
  if (!root) { return null; }

  const logo = root.get('logoDark');
  if (!logo) { return null; }

  return (
    <Scrivito.LinkTag to={ root }>
      <Scrivito.ImageTag content={ logo } className="logo" alt="Logo" />
    </Scrivito.LinkTag>
  );
});

const Address = Scrivito.connect(({ addressWidget }) => {
  const localityRegionPostalCode = [
    addressWidget.get('locationLocality'),
    addressWidget.get('locationRegion'),
    addressWidget.get('locationPostalCode'),
  ].filter(n => n).join(' ');

  const lines = [
    addressWidget.get('locationName'),
    addressWidget.get('locationStreetAddress'),
    localityRegionPostalCode,
    addressWidget.get('locationCountry'),
  ].filter(n => n);


  if (!lines.length) {
    return (
      <InPlaceEditingPlaceholder>
        Provide the location in the address widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  const breakedLines = lines.reduce((array, value) => {
    array.push(value);
    array.push(<br key={ value } />);
    return array;
  }, []);

  return <p>{ breakedLines }</p>;
});

function Table(values) {
  const columns = Object.keys(values).map(name => {
    return <TableColumn key={ name } name={ name } value={ values[name] } />;
  });

  if (columns.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        { columns }
      </tbody>
    </table>
  );
}

function TableColumn({ name, value }) {
  const localization = {
    phone: 'Phone',
    mobile: 'Mobile',
    fax: 'Fax',
    eMail: 'E-Mail',
  };

  const linkPrefixes = {
    phone: 'tel',
    mobile: 'tel',
    fax: 'fax',
    eMail: 'mailto',
  };

  const prefix = linkPrefixes[name];

  if (!value) {
    return null;
  }

  const href = prefix ? `${prefix}:${value}` : value;

  return (
    <tr>
      <td>{ `${localization[name]}: ` }</td>
      <td><a href={ href }>{ value }</a></td>
    </tr>
  );
}
