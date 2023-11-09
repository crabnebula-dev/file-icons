use criterion::{black_box, criterion_group, criterion_main, Criterion};
use file_icons::{_fi, _fo};

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("_get_icon_for_file", |b| {
        let path = "test.js";
        b.iter(|| unsafe { _fi(black_box(path.as_ptr()), black_box(path.len())) })
    });
    c.bench_function("_get_icon_for_folder", |b| {
        let path = ".github";
        b.iter(|| unsafe { _fo(black_box(path.as_ptr()), black_box(path.len())) })
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
