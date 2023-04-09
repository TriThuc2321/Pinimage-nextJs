import { Discover, Category } from '~/components';
import { MainLayout } from '~/layouts';

export default function Home() {
    return (
        <div className="top-0 bottom-0 left-0 right-0">
            <Discover />
            <Category />
        </div>
    );
}

Home.Layout = MainLayout;
